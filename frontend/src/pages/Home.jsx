import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import AnimePage from "./AnimePage";
function Home() {
  const [animeDetails, setAnimeDetails] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12); // Change this value according to your preference
  const [pagesToShow] = useState(5); // Change this value to limit the number of pages shown
  const [error,setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/anime/search?query=${searchQuery}`
        );
        setAnimeDetails(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching anime data:", error);
        // Display an error message to the user using an alert
        if (error.response && error.response.data && error.response.data.message) {
          alert(error.response.data.message);
        } else {
          alert("An error occurred while fetching anime data.");
        }
        setError(error.response.data.message || "An error occurred while fetching anime data.");
      }
      
    };

    fetchData();
  }, [searchQuery]);

  const handleSearch = (event) => {
    event.preventDefault();
    setSearchQuery(event.target.value);
    setCurrentPage(1); // Reset current page to 1
  };
  
  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = animeDetails.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(animeDetails.length / itemsPerPage);

  const renderPageNumbers = () => {
    const startPage = Math.max(1, currentPage - Math.floor(pagesToShow / 2));
    const endPage = Math.min(totalPages, startPage + pagesToShow - 1);

    return Array.from({ length: endPage - startPage + 1 }, (_, index) => {
      const pageNumber = startPage + index;
      return (
        <button
          className={`mr-4 text-black bg-white p-4 ${
            currentPage === pageNumber ? "font-bold" : ""
          }`}
          key={pageNumber}
          onClick={() => paginate(pageNumber)}
        >
          {pageNumber}
        </button>
      );
    });
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  
  return (
    <div className="">
      <Navbar />
      <form className="flex justify-center items-center mt-5">
        <input
          className="p-3 flex w-[500px] text-black border-2 border-black rounded-2xl"
          type="text"
          placeholder="Search for anime..."
          value={searchQuery}
          onChange={handleSearch}
        />
      </form>
      <div className="grid md:grid-cols-4 gap-4">
        {currentItems.map((anime) => (
          <div
            key={anime.mal_id}
            className="w-full bg-white shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300 items-center justify-center"
          >
            <h2 className="text-center text-2xl font-bold">{anime.title}</h2>
            <img
              className="w-30 mx-auto mt-4  bg-white"
              src={anime.images?.jpg?.image_url}
              alt={anime.title}
            />
          <Link
  to={`/info/${anime._id}`}
  className="bg-blue-500 text-white hover:bg-sky-500 font-bold py-2 px-4 mt-4 rounded block w-[200px] text-center"
>
  More Info
</Link>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-4">
        {/* Previous page button */}
        <button
          className="mr-2 text-black bg-white p-4"
          onClick={goToPrevPage}
          disabled={currentPage === 1}
        >
          &lt;
        </button>

        {/* Render page numbers */}
        {renderPageNumbers()}

        {/* Next page button */}
        <button
          className="ml-2 text-black bg-white p-4"
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
        >
          &gt;
        </button>
      </div>
    </div>
  );
}

export default Home;
