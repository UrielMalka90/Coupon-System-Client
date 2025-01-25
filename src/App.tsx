import { ToastContainer } from 'react-toastify';
import './App.css';
import Footer from './Components/Footer/Footer';
import Header from './Components/Header/Header';
import Main from './Components/Main/Main';

function App() {

  return (
    <>
      <Header />
      <Main />
      <Footer />
      <ToastContainer />
    </>
  )
}

export default App
