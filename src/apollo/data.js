import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { renderToStringWithData } from '@apollo/client/react/ssr';
import { ALL_PRODUCTS } from "../apollo/products";

export default function withQuery(Component) {
    return function WrappedComponent(props) {
        const { loading, data } = useQuery(ALL_PRODUCTS);
        return <Component {...props} dataValue={data} loading={loading} />;
    }
}