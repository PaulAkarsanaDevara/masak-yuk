import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { store } from './store';
import Navbar from './components/layout/Navbar';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import IngredientsPage from './pages/IngredientsPage';
import FavoritesPage from './pages/FavoritesPage';
import RecipeDetailPage from './pages/RecipeDetailPage';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <HomePage />
                <Navbar />
              </>
            }
          />
          <Route
            path="/search"
            element={
              <>
                <SearchPage />
                <Navbar />
              </>
            }
          />
          <Route
            path="/ingredients"
            element={
              <>
                <IngredientsPage />
                <Navbar />
              </>
            }
          />
          <Route
            path="/favorites"
            element={
              <>
                <FavoritesPage />
                <Navbar />
              </>
            }
          />
          <Route path="/recipe/:id" element={<RecipeDetailPage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);
