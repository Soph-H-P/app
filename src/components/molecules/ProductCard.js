import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

import deleteSvg from '../../assets/icons/deleteSvg.svg';
import edit from '../../assets/icons/editSvg.svg';
import { baseUrl } from '../../settings/api';
import { bagItemsKey } from '../../settings/settings';
import { filterList, getFromStorage, saveToStorage } from '../../utils/storage';
import Button from '../atoms/Button';
import Icon from '../atoms/Icon';
import SubTitle from '../atoms/SubTitle';
import AddToFavouritesButton from './AddToFavouritesButton';
import ChangeQuantity from './ChangeQuantity';
import { findInList } from '../../utils/storage';

const CardWrpper = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 250px;
  width: 100%;
  max-width: 400px;
  border: ${(props) => props.theme.black} solid 1px;
  background: ${(props) => props.theme.white};
  transition: all 0.3s ease;
  text-decoration: none;

  h2 {
    margin-bottom: 0px;
  }

  a {
    transition: all 0.3s ease;
  }

  a:hover {
    text-decoration: underline;
    color: ${(props) => props.theme.primaryColor};
  }

  #imageContainer {
    height: 250px;
    overflow: hidden;
    display: flex;
    justify-content: center;
  }

  #imageContainer img {
    object-fit: cover;
    height: 100%;
  }

  #imageContainer img:hover {
    transform: scale(1.1);
    transition: all 0.3s ease;
  }

  img {
    width: 100%;
    margin: auto;
  }

  #delete-button {
    align-self: center;
  }
  #delete-button > div {
    width: 32px;
    height: 32px;
  }

  ${(props) =>
    props.bag &&
    css`
      padding: 10px;

      & > div {
        display: flex;

        align-items: center;
      }

      #imageContainer {
        height: 100px;
        width: 100px;
        overflow: hidden;
      }
    `}
`;

const ProductInfoContainer = styled.div`
  display: flex;
  padding: 10px;
  justify-content: space-between;
  width: 100%;

  div {
    display: flex;
    flex-direction: column;
  }

  div:last-child {
    align-items: center;
  }

  #edit-button:hover {
    transform: scale(1.1);
  }
`;

const ProductCard = ({ product, isFavourite, userRole, setItemsInFavourites, setItemsInBag }) => {
  const isBag = typeof setItemsInBag === 'function';
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    if (product && isBag) {
      setQuantity(findInList(getFromStorage(bagItemsKey), product.id).quantity);
    }
  }, [isBag, product]);

  const handleRemoveItem = (e) => {
    const item = e.target;
    const id = parseInt(item.dataset.id);
    const currentBagItems = getFromStorage(bagItemsKey);
    const removedBagItem = filterList(currentBagItems, id);
    saveToStorage(bagItemsKey, removedBagItem);
    setItemsInBag(getFromStorage(bagItemsKey));
  };

  return (
    <CardWrpper bag={isBag}>
      <div>
        <Link to={`/product/?id=${product.id}`} id="imageContainer">
          <img
            src={product.image ? baseUrl + product.image.formats.small.url : product.image_url}
            alt={product.alternativeText || product.title}
          />
        </Link>
        <ProductInfoContainer bag={isBag}>
          <div>
            <Link to={`/product/?id=${product.id}`}>
              <SubTitle>{product.title}</SubTitle>
            </Link>
            <p>Price: ??{product.price.toFixed(2)}</p>
          </div>
          <div>
            <AddToFavouritesButton
              isFavourite={isFavourite}
              productId={product.id}
              setItemsInFavourites={setItemsInFavourites}
            />
            {userRole === 'Authenticated' && (
              <Link id="edit-button" to={`/content-editor?id=${product.id}`}>
                <Icon iconSource={edit} alt="edit product"></Icon>
              </Link>
            )}
          </div>
        </ProductInfoContainer>
      </div>
      {isBag && (
        <>
          <ChangeQuantity
            quantity={quantity}
            setItemsInBag={setItemsInBag}
            productId={product.id}
          />
          <p>Total price: ??{(product.price * quantity).toFixed(2)}</p>
          <Button id="delete-button" handleClick={handleRemoveItem} icon={true} dataId={product.id}>
            <Icon productId={product.id} iconSource={deleteSvg} alt="remove product from bag" />
            Remove item from bag
          </Button>
        </>
      )}
    </CardWrpper>
  );
};

export default ProductCard;
