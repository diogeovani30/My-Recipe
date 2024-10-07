import './App.css';
import NavBar from './components/NavBar'
import Card from './components/Card'
import Footer from './components/Footer'
import { useEffect, useState } from 'react';

function App() {
  const [recipes, setRecipes] = useState([]);
  const [showRecipe, setShowRecipe] = useState([]);

  useEffect(() => {
    fetch("https://dummyjson.com/recipes")
      .then(response => response.json())
      .then((data) => {
        if (data && data.recipes) {  // Memastikan data tersedia
          let dataRecipes = data.recipes.slice(0, 12);  // Ambil 12 resep pertama
          setRecipes(dataRecipes);
          setShowRecipe(dataRecipes);
        } else {
          console.log('No recipes found');
        }
      })
      .catch(err => console.log(err));
  }, []);

  const search = (text) => {
    // Mengubah pencarian menjadi case-insensitive
    let data = recipes.filter(e => e.name.toLowerCase().includes(text.toLowerCase()));
    setShowRecipe(data);
  }

  return (
    <div className="App">
      <NavBar search={search} />
      <img 
        data-testid="image-banner" 
        className='w-100 object-fit-cover' 
        style={{ height: 400 }} 
        src="https://www.instacart.com/company/wp-content/uploads/2022/11/cooking-statistics-hero.jpg" 
        alt="banner" 
      />
      <div className='d-flex flex-wrap justify-content-around py-5 gap-2'>
        {showRecipe.length > 0 ? (
          showRecipe.map((el) => <Card key={el.id} el={el} />)
        ) : (
          <p>No recipes found</p>  // Menampilkan pesan jika tidak ada resep
        )}
      </div>
      <Footer />
    </div>
  );
}

export default App;
