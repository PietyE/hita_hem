import React from 'react';
import Script from "next/script";

const Schema = ({makeSchema, data, key }) => {
    // console.log(JSON.stringify(makeSchema(data)))
    return (
            <Script
                type='application/ld+json'
                dangerouslySetInnerHTML={{ __html: JSON.stringify(makeSchema(data)) }}
                key={key}
            />
    );
}

export default Schema;