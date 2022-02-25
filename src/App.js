import './App.css';
import Head from './Head';
import Foot from './Foot';
import Dash from './Pages/dashboard/Dash';
import { Layout } from 'antd';
import { Routes, Route } from 'react-router-dom'
import Home from './Pages/home/Home';
import About from './Pages/about/About';
import Contact from './Pages/contact/Contact';
import Login from './Pages/login/Login';
import Signup from './Pages/signup/Signup';
import View from './Pages/dashboard/View';
import ViewCart from '../src/cart/ViewCart'
import Profile from './Pages/Profile/Profile';


const { Header, Content, Footer } = Layout;

const App = () => {

  return (
    <>
      <Layout>
        
        <Header className='header'>
          <Head />
        </Header>

        <Content className="site-layout content">
          <div className="site-layout-background">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/dash" element={<Dash />} />
              <Route path="/view/:id" element={<View />} />
              <Route path="/viewCart" element={<ViewCart />} />
              <Route path="/logout" />
            </Routes>
          </div>

        </Content>

        <Footer style={{ textAlign: 'center' }}>
          <Foot />
        </Footer>

      </Layout>
    </>
  )
}
export default App;
