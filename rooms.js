let allRooms=[]

const fetchRoomsData = async () => {
  const data = await fetch(`ROOMS.json`);
  const result = await data.json();
  allRooms = result
  displayRoomsData(result);
};

fetchRoomsData();

const displayRoomsData = async (rooms) => {
  
  const roomsContainer = document.getElementById("rooms-container");
  roomsContainer.innerHTML='';
  // console.log(rooms);
  rooms.forEach((room) => {
    const { name, summary, property_type, images,number_of_reviews,price,_id } = room;
    roomsContainer.innerHTML += `
 <div class="col">
 <div class="card h-100">
   <img src=${images.picture_url} class="card-img-top " alt="..." style=" height: 300px;
   object-fit: fill;">
   <div class="card-body">
     <h4 class="card-title">${name}</h4>
     <p>Number_of_reviews : ${number_of_reviews}</p>
     <h5>Price : ${price.$numberDecimal}</h5>
    
     <p class="card-text">${property_type}</p>
     <p class="card-text">${summary}</p>
   </div>
   <button class="btn btn-info btn-lg"  role="button" onclick='addToCart(${_id})'
                >Add to cart</button>
 </div>
</div>
 `;
  });
};





const range = document.getElementById('review-range');
range.addEventListener("input", () => {
  const value = range.value;
  // console.log(value);
  document.getElementById('review-count').innerText = value;
  const filteredData = allRooms.filter((r) => r.number_of_reviews >= value);
  displayRoomsData(filteredData);
});





document.getElementById('sort-by-price-btn').addEventListener('click', () =>{
     allRooms.sort((a,b)=>{
      // console.log('1st price:', a.price.$numberDecimal, '2nd price:', b.price.$numberDecimal)
        return parseFloat(a.price.$numberDecimal) > parseFloat(b.price.$numberDecimal)  ? 1 : -1 ;
    })
    // console.log(allRooms)
    displayRoomsData(allRooms)
})