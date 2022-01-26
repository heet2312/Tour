import { useState, useEffect } from "react";
import React from "react";
const url = "https://course-api.com/react-tours-project";

function Tour() {
    const [isLoading, SetIsLoading] = useState(true);
    const [tours, SetTours] = useState("");
    const removeCard = (id) => {
        const newTour = tours.filter((tour)=> tour.id !== id);
        SetTours(newTour);
    }
    
 const FetchTours = async () => {
      SetIsLoading(true);
      try {
        const response = await fetch(url);
        const tours = await response.json();
        SetIsLoading(false);
        SetTours(tours);
      } catch (error) {
        SetIsLoading(false);
        console.log(error);
      }
    };
  useEffect(() => {
       FetchTours();
     }, []);
  if(isLoading){
      return (
          <div>
              <h1 className="loading">Loading...</h1>
          </div>
      )
  }

  return (
    <>
      <h1 className="title">Our Tours</h1>
      <div>
      {tours && tours.map((item) => {
        const {id,image,info,price,name} = item;
        return <article className="single-tour" key={id}>
            <img src={image} alt="img" />
            <footer>
                <div className="tour-info">
                    <h4>{name}</h4>
                    <h4 className="tour-price">${price}</h4>
                </div>
                <p>{info}</p>
                <button className="delete-btn" onClick={()=>removeCard(id)}>Not interested</button>
            </footer>
        </article>
      })}
      </div>
    </>
  )
}

export default Tour;