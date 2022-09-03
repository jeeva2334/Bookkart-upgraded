const Books = ({books,img}) => {
    return ( 
        <div>
            {
                books.map(book=>{
                    <>
                        {/* <h1>{book.img}</h1> */}
                        <img src={book.img} alt="" />
                    </>
                })
            }
        </div>
     );
}
 
export default Books;