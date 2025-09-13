import React from 'react'

const Page = async ({params}: {params: {id: string}}) => {

    const id = params.id;
    console.log(id);

  return (
    <div>
        <h1>Startup Details</h1>
      
    </div>
  )
};

export default Page
