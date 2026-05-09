import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import loadable from '@loadable/component';
import { store } from './store';
import Navbar from './components/layout/Navbar';
import { DarkModeProvider } from './context/DarkModeContext';
import './index.css';

const Loading = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="w-8 h-8 border-4 border-orange-400 border-t-transparent rounded-full animate-spin" />
  </div>
);

const fallback = { fallback: <Loading /> };

const HomePage = loadable(() => import('./pages/HomePage'), fallback);
const SearchPage = loadable(() => import('./pages/SearchPage'), fallback);
const IngredientsPage = loadable(() => import('./pages/IngredientsPage'), fallback);
const FavoritesPage = loadable(() => import('./pages/FavoritesPage'), fallback);
const RecipeDetailPage = loadable(() => import('./pages/RecipeDetailPage'), fallback);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <DarkModeProvider>
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
      </DarkModeProvider>
    </Provider>
  </React.StrictMode>,
);
