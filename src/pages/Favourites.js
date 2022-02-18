import React, { useEffect, useState } from 'react';

import PageWrapper from '../components/atoms/PageWrpper';
import Title from '../components/atoms/Title';
import ProductsGrid from '../components/organisms/ProductsGrid';
import fetchLocalProducts from '../utils/fetchLocalProducts';

const Favourites = ({ userRole, itemsInFavourites, setItemsInFavourites }) => {
  const [currentFavourites, setCurrentFavourites] = useState([]);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    fetchLocalProducts(setCurrentFavourites, itemsInFavourites, setIsError);
  }, [itemsInFavourites]);

  return (
    <PageWrapper>
      {currentFavourites.length === 0 && <Title>Currently no favourited items</Title>}
      {currentFavourites.length >= 1 && (
        <>
          {!isError && (
            <Title>
              Your Favourites ({currentFavourites.length}
              {itemsInFavourites.length >= 2 ? ' items' : ' item'})
            </Title>
          )}
          <ProductsGrid
            userRole={userRole}
            productsToRender={currentFavourites}
            setItemsInFavourites={setItemsInFavourites}
            isError={isError}
          ></ProductsGrid>
        </>
      )}
    </PageWrapper>
  );
};

export default Favourites;
