import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

// import { addCollectionAndDocuments, getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";
// import { setCategoriesMap } from "../../store/category/category.action";
import {
    selectCategoriesMap,
    selectCategoriesIsLoading,
} from '../../store/category/category.selector';
import ProductCard from '../../components/product-card/product-card.component';
import Spinner from '../../components/spinner/spinner.component';

import './category.styles.scss';

const Category = () => {
    const categoriesMap = useSelector(selectCategoriesMap);
    const isLoading = useSelector(selectCategoriesIsLoading);
    const { category } = useParams();
    const [products, setProducts] = useState(categoriesMap[category]);

    useEffect(() => {
        setProducts(categoriesMap[category]);
    }, [category, categoriesMap]);

    return (
        <>
            <h2 className='category-title'>{category.toUpperCase()}</h2>
            {isLoading ? (
                <Spinner />
            ) : (
                <div className='category-container'>
                    {products &&
                        products.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                </div>
            )}
        </>
    );
};

export default Category;
