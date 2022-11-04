import { Component } from "react";

import { Loading } from "components/Loading/Loading";
import { Searchbar } from "components/Searchbar/Searchbar";
import { ImageGallery } from "components/ImageGallery/ImageGallery";
import { LoadMoreBtn } from "components/LoadMoreBtn/LoadMoreBtn";
import { searchImage } from "services/searchApi";
import {Modal} from "components/Modal/Modal";
import { LargeImage } from "components/LargeImage/LargeImage";
import { Container } from "./App.styled";
import { ErrorMessage } from "components/ErrorMessage/ErrorMessage";


export class App extends Component {
  state = {
    search: '',
    status: null,
    imageArray: [],
    page: 1,
    error: null,
    showModal: false,
    image: {},
    showLoadMoreBtn:true,
  };


  async componentDidUpdate(_, prevState) {
    const {search, page } = this.state;
    if (search !== prevState.search) {
      try {
        const data = await searchImage({ search, page }); 
        if (data.hits.length === 0) {
          this.setState({ error: `${search} not found :(`, status: "rejected", showModal: true });
        } else {
          if (data.hits.length < 12) {
            this.setState({
            imageArray: [...data.hits],
            status: "resolved",
            showModal: false,
            showLoadMoreBtn:false,
          })
          } else {
            this.setState({
            imageArray: [...data.hits],
            status: "resolved",
            showModal: false,
            showLoadMoreBtn:true
          })
          }
          
        }
      } catch {
        this.setState({ error: `Failed to load ${search} :(`, status: "rejected", showModal: true });
      } 
    }

    if (page !== prevState.page && page !== 1) {
      try {
        const data = await searchImage({ search, page }); 
        if (data.hits.length < 12) {
          this.setState(prevState => ({
          imageArray: [...prevState.imageArray, ...data.hits],
          status: "resolved",
          showModal: false,
          showLoadMoreBtn: false,
        }))
        } else {
          this.setState(prevState => ({
          imageArray: [...prevState.imageArray, ...data.hits],
          status: "resolved",
          showModal: false,
          showLoadMoreBtn: true,
        }))
        }
        
      
      } catch {
        this.setState({ error: `Failed to load ${search} :(`, status: "rejected", showModal: true });
      } 
    }

  }

  handleSubmit = ({ search }) => {
    this.setState({ search, page: 1 });
  }


  handleSearch = () => {
    this.setState({ status: "pending", showModal: true, showLoadMoreBtn: true });
  }

  openImage = ({ url, alt}) => {
    this.setState((prevState) => ({
      showModal: !prevState.showModal,
      image: { url, alt }
    }));    
  }

  toggleModal = () => {
    this.setState(prevState => {
      return ({
        showModal: !prevState.showModal,
      })
    });
  }

  handleLoadMore = () => {
    this.handleSearch();
    this.setState(prevState => ({
      page: prevState.page + 1,
    }))
  }

  render() {
    const {status, error, imageArray, showModal, image, showLoadMoreBtn} = this.state;
    return (
      <Container>
        <Searchbar onSubmit={this.handleSubmit} />

        {status === "rejected" && <ErrorMessage error={error} />}
          
        {status === "pending" && <>
          {imageArray.length > 0 ?
            <>
            <ImageGallery imageArray={imageArray} onClick={this.openImage} />
            <Loading/>
            {showLoadMoreBtn && <LoadMoreBtn onClick={this.handleLoadMore} />}
            
            </> :
            <Loading />}
        </>
        }
        
        {status === "resolved" && <>
          {showModal ? 
              <>
                <ImageGallery imageArray={imageArray} onClick={this.openImage} />
                {showLoadMoreBtn && <LoadMoreBtn onClick={this.handleLoadMore} />}
                <Modal onClose={this.toggleModal}>                  
                  <LargeImage data={image} />
                </Modal>
              </>:
              <>
                <ImageGallery imageArray={imageArray} onClick={this.openImage} />
                {showLoadMoreBtn && <LoadMoreBtn onClick={this.handleLoadMore} />}
              </>
          }
        </>
        }
      </Container>
    );
  };
}