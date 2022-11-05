import { useState, useEffect } from "react";

import { Loading } from "components/Loading/Loading";
import { Searchbar } from "components/Searchbar/Searchbar";
import { ImageGallery } from "components/ImageGallery/ImageGallery";
import { LoadMoreBtn } from "components/LoadMoreBtn/LoadMoreBtn";
import { searchImage } from "services/searchApi";
import { Modal } from "components/Modal/Modal";
import { LargeImage } from "components/LargeImage/LargeImage";
import { Container } from "./App.styled";
import { ErrorMessage } from "components/ErrorMessage/ErrorMessage";


export function App () {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState(null);
  const [imageArray, setImageArray] = useState([]);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [image, setImage] = useState({});
  const [showLoadMoreBtn, setShowLoadMoreBtn] = useState(true);


  useEffect(() => {
    if (search === '') return;

    const fetchData = async () => {
      try {
        const data = await searchImage({ search, page });
        if (data.hits.length === 0) {
          setError(`${search} not found`);
          setStatus("rejected");
          setShowModal(true);          
        } else {
          page === 1? setImageArray([...data.hits]): setImageArray(prevImageArray=>[...prevImageArray, ...data.hits]);
          setStatus("resolved");
          setShowModal(false);
          data.hits.length < 12 ? setShowLoadMoreBtn(false) : setShowLoadMoreBtn(true); 
        }
      } catch {
        setError(`Failed to load ${search}`);
        setStatus("rejected");
        setShowModal(true); 
    }
    }

    fetchData();     
  }, [page, search]);


  const handleSubmit = ({ searchValue }) => {
    setSearch(searchValue);
    setPage(1);
  }

  const handleSearch = () => {
    setStatus("pending");
    setShowModal(true);
    setShowLoadMoreBtn(true);    
  }

  const openImage = ({ url, alt }) => {
    setShowModal(prevShowModal => !prevShowModal);
    setImage({ url, alt });    
  }

  const toggleModal = () => {
    setShowModal(prevShowModal => !prevShowModal);
  }

  const handleLoadMore = () => {
    handleSearch();
    setPage(prevPage => prevPage + 1);
  }


  return (
      <Container>
        <Searchbar onSubmit={handleSubmit} />

        {status === "rejected" && <ErrorMessage error={error} />}
          
        {status === "pending" && <>
          {imageArray.length > 0 ?
            <>
            <ImageGallery imageArray={imageArray} onClick={openImage} />
            <Loading/>
            {showLoadMoreBtn && <LoadMoreBtn onClick={handleLoadMore} />}
            
            </> :
            <Loading />}
        </>
        }
        
        {status === "resolved" && <>
          {showModal ?
              <>
                <ImageGallery imageArray={imageArray} onClick={openImage} />
                {showLoadMoreBtn && <LoadMoreBtn onClick={handleLoadMore} />}
                <Modal onClose={toggleModal}>
                  <LargeImage data={image} />
                </Modal>
              </>:
              <>
                <ImageGallery imageArray={imageArray} onClick={openImage} />
                {showLoadMoreBtn && <LoadMoreBtn onClick={handleLoadMore} />}
              </>
          }
        </>
        }
      </Container>
    );
}