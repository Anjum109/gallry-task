
import './App.css';
import ImageGallery from './components/ImageGallry/ImageGallary';




function App() {
  return ( 
     <div className='lg:bg-green-100 h-full py-12'>
       <div className=" max-w-screen-lg mx-auto rounded-lg bg-white ">
        <ImageGallery/>
      </div>
     </div>
  
  );
}

export default App;
