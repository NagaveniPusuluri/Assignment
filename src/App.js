import './App.css';
import React ,{useState, useEffect} from 'react';
import SearchForm from './components/search';
import{useParams} from "react-router-dom";
function App() {
 // const [data,setData]=useState();
 // const [search,setSearch]=useState();
 // const [url,setUrl]=useState();
  //let arr=["Margarita","Mojito","Popular","Offer","Recommended"]
 /* const getData=(itemType)=>{
    if(itemType==="margarita"){
      url="www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita";
    }
    if(itemType==="mojito"){
      url="www.thecocktaildb.com/api/json/v1/1/random.php";
    }
    if(itemType==="popular"){
      url="www.thecocktaildb.com/api/json/v1/1/randomselection.php";
    }
    if(itemType==="offer"){
      url="www.thecocktaildb.com/api/json/v1/1/popular.php";
    }
    if(itemType==="recommended"){
      url="www.thecocktaildb.com/api/json/v1/1/latest.php";
    }
  }*/
  const [cocktail,setCocktail]=useState({});
  const [items,setItems]=useState([]);
  const {id}=useParams();
  const url = "www.thecocktaildb.com/api/json/v1/1/filter.php?g=Cocktail_glass";
  const fetchData=React.useCallback(async()=>{
    try{
      const response=await fetch(`${url}${id}`);
      const data=await response.json();
      const {drink}=data;
      if (drink){
        setCocktail(drink[0]);
        let{
          strItem1:item1,
          strItem2:item2,
          strItem3:item3,
          strItem4:item4
        }=drink[0];
        setItems([item1,item2,item3,item4]);
      }else{
        setCocktail({});
      }
    }catch(error){
      console.log(error);
    }
  },[id]);

  useEffect(()=>{
    fetchData();
  },[id,fetchData]);

  const {
    strDrink:name,
    strAlcoholic:info,
    //strGlass:glass,
    strDrinkThumb:img,
    //strInstructions:instructions
  }=cocktail;
  return (
    <div className="App">
    
      <nav className="nav">
        <ul className="nav-items">
          <li>
            <ul className="shop-logo">
              <li><img src="https://thecocktaildb.com/images/ingredients/gin-Small.png" height="60" width="80" alt=" "/></li>
              <li>
                <ul className="shop-details">
                  <li className="shop-name">Cocktail Cafe</li>
                  <li className="shop-location">78 Sazz Street, India</li>
                  <li><button className="shop-button">Open</button></li>
                </ul>
              </li>
              </ul>
          </li>
          <li className="main-logo">
            <img src="https://thecocktaildb.com/images/media/drink/vrwquq1478252802.jpg/preview" height="300" width="500" alt=" "/>
          </li>  
          <li className="shop-timings">
          <span>time: 12:00AM - 11:59PM</span>
          </li>
        </ul>
      </nav>
      <body className="body-main">
        <ul className="main-body">
          <li className="left-section">
            <ul className="menu-header">
              <li>Menu</li>
            </ul>
            <ul className="menu-list">
              <li className="menu-active" >Margarita</li>
              <li>Mojito</li>
              <li>Popular</li>
              <li>Offer</li>
              <li>Recommended</li>
            </ul>

          </li>
          <li className="right-section">
            <ul className="right-side">

              <li>
              {/*  <input type="text" placeholder="Search your favourite items..."/>*/}
              <SearchForm/>
              </li>
              <li>
                <div>
                  <ul className="category-name">
                    <li>{name}
                    <span className="item-count">(2 Items)</span>
                    </li>
                    
                  </ul>
                  <div className="categoty">
                    <ul className="item-menu">
                    <ul className="item-logo">
                      <li>
                        <img src={img} height="60" width="80" alt=" "/></li>
                      <li>
                        <ul className="item-details">
                          <li className="item-name">{items}</li>
                          <li className="item-location">{info}</li>
                          
                        </ul>
                        </li>
                        </ul>
                        <li><button className="item-button">OPEN</button></li>
                        {items.map((item, index) => {
                            if (items) {
                              return <span key={index}>{items}</span>;
                        }
                        return null;
                        })}
                    </ul>
                  </div>
                </div>
              </li>
            </ul>
          </li>

        </ul>
      </body>
    </div>
  );
}

export default App;
