import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from "../components/Navbar.jsx"

const AnimePage = () => {
  const [animeInfo, setAnimeInfo] = useState({});
  const [recommendedAnime, setRecommendedAnime] = useState([]);
  const { animeID } = useParams();
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    let isMounted = true;

    const fetchAnimeInfo = async () => {
      try {
        const response = await fetch(`http://localhost:4000/anime/${animeID}`);
        if (response.ok) {
          const data = await response.json();
          if (isMounted) {
            setAnimeInfo(data);
          }
        } else {
          console.error('Failed to fetch anime details');
        }
      } catch (error) {
        console.error('Error fetching anime details:', error);
      }
    };
   
    const fetchRecommendedAnime = async () => {
      try {
        const response = await fetch(`http://localhost:4000/anime/similar-anime/${animeID}`);
        if (response.ok) {
          const data = await response.json();
          if (isMounted) {
            setRecommendedAnime(data);;
          }
        
        } else {
          console.error('Failed to fetch recommended anime');
        }
      } catch (error) {
        console.error('Error fetching recommended anime:', error);
      }
    };
    
    
    fetchAnimeInfo();
    fetchRecommendedAnime();
    return () => {
      isMounted = false;
    };
  }, [animeID]);
  const handlePrevAnime = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? recommendedAnime.length - 1 : prevIndex - 1));
  };

  const handleNextAnime = () => {
    setCurrentIndex((prevIndex) => (prevIndex === recommendedAnime.length - 1 ? 0 : prevIndex + 1));
  };
  if (Object.keys(animeInfo).length === 0) {
    return null; // Render loading state or fallback UI
  }

  return (
    <div className="">
      <Navbar/>
      <div className='max-w-[1280px] mx-auto py-4'>
      <h1 className='text-2xl font-bold border-b-4 border-black text-center bg-[#e1e7f5]'>{animeInfo.title}</h1>
      <div className='lg:flex sm:justify-center '>
      <img className='h-[400px]' src={animeInfo.images?.jpg?.image_url} alt="" />
      <p className=' flex-grow p-2 font-bold w-full text-slate-800'> <h1 className='text-2xl text-center font-bold border-b-2 border-black'>Synopsis</h1>{animeInfo.synopsis}</p>
   
      </div>
      <div className='lg:flex  justify-between'>
      <div className='w-[400px] max-w-full border-2 border-black mt-5 p-2 '>
      <div>
      <h1 className=' border-b-2 border-black font-bold'>Alternative titles</h1>
      <p><span className=' font-bold'>Japanese:</span> {animeInfo.title_japanese}</p>
      
      </div>
      <div className='mt-5'>
        <h1 className='border-b-2 border-black font-bold'>Information</h1>
      <p><span className='font-bold mr-1'>Episodes:</span>{animeInfo.episodes}</p>
      <p><span className='font-bold mr-1'>Type:</span>{animeInfo.type}</p>  
      <p><span className='font-bold mr-1'>Source:</span>{animeInfo.source}</p>
      <p><span className='font-bold mr-1'>Status:</span>{animeInfo.status}</p>
      <p><span className='font-bold mr-1'>Broadcast:</span>{animeInfo.broadcast.string}</p>
      <p><span className='font-bold mr-1'>Premiered:</span>{animeInfo.aired?.string}</p>
      <p><span className='font-bold mr-1'>Duration:</span>{animeInfo.duration}</p>
      <p><span className='font-bold mr-1'>Rating:</span>{animeInfo.rating}</p>
      <p className='flex'><span className='font-bold mr-1'>Producers:</span>
      {animeInfo.producers.map((producer) => (
        <div key={producer.mal_id}>
          <p className='mr-1'>{producer.name}</p>
    
        </div>
      ))}
      </p>
      <p className='flex'><span className='font-bold mr-1'>Licensors:</span>
      {animeInfo.licensors.map((licensor) => (
        <div key={licensor.mal_id}>
         
          <p className='mr-2'>{licensor.name}</p>
        </div>
      ))}
      </p>
      <p className='flex'><span className='font-bold mr-1'>Genres:</span>
      {animeInfo.genres.map((genre) => (
        <div key={genre.mal_id}>
          <p className='mr-2'>{genre.name}</p>
        </div>
      ))}
      </p>
      <p className='flex'><span className='font-bold mr-1'>Themes:</span>
      {animeInfo.themes.map((theme) => (
        <div key={theme.mal_id}>
          <p className='mr-2'> {theme.name}</p>
        </div>
      ))}
       </p>
       <p className='w-full break-words'>
  <a href={animeInfo.url} target="_blank" rel="noopener noreferrer" className='inline-block px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600'>
    More info
  </a>
</p>
      </div>
      <div className='mt-5'>
        <h1 className='border-b-2 border-black font-bold'>Statistics</h1>
    
      <p><span className='font-bold mr-1'>Score:</span>{animeInfo.score}</p>
      <p><span className='font-bold mr-1'>Scored By:</span>{animeInfo.scored_by}</p>
      <p><span className='font-bold mr-1'>Rank:</span>{animeInfo.rank}</p>
      <p><span className='font-bold mr-1'>Popularity:</span>{animeInfo.popularity}</p>
      <p><span className='font-bold mr-1'>Members:</span>{animeInfo.members}</p>
      <p><span className='font-bold mr-1'>Favorites:</span>{animeInfo.favorites}</p>
      </div>
      <div>
     
      </div>
      
      </div>
      <div className='ml-10 text-center flex flex-col '>
  <h1 className='font-bold'>Trailer:</h1>
  {animeInfo.trailer?.url ? (
    <iframe
      title="Trailer"
      width="460"
      height="415"
      src={animeInfo.trailer.url.replace('watch?v=', 'embed/')}
      frameBorder="0"
      allowFullScreen
    ></iframe>
  ) : (
    <p>No trailer available</p>
  )}
</div>

</div>
<div className='h-[500px] text-center max-w-[1240px] mx-auto w-full flex mt-10'>
 <h1>Recommended Siilar </h1>
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-2 py-1 rounded-l text-xs w-6 h-6"
onClick={handlePrevAnime}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
</svg>

  
        <div className="flex max-w-[800px]">
          {recommendedAnime.map((anime, index) => (
            <div key={anime._id} className={index >= currentIndex && index < currentIndex + 5 ? '' : 'hidden'}>
              <img className='h-[200px] w-[500px]' src={anime.images.jpg.image_url} alt="" />
              <p className='mr-1 h-full font-bold max-w-[200px] w-full'>{anime.title}</p>
            </div>
          ))}
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
        className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-2 py-1 rounded-r text-xs w-6 h-6"
        onClick={handleNextAnime}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
</svg>
      </div>
      <h1 className=''>Comments</h1>
      
        {animeInfo.comments.map((comment) => (
        <div key={comment._id} className="my-4 p-4 border border-gray-200">
          <p className="font-bold">{comment.username}</p>
          <p>{comment.comment}</p>
          <div className="flex space-x-2">
            <button
              className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded"
              onClick={() => {
                // Handle like button click
              }}
            >
              Likes: {comment.likes}
            </button>
            <button
              className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
              onClick={() => {
                // Handle dislike button click
              }}
            >
              Dislikes: {comment.dislikes}
            </button>
          </div>
        </div>
      ))}
       <div className="my-4">
        <textarea
         
  
          className="border border-gray-300 rounded p-2 w-full"
          placeholder="Write a comment..."
        ></textarea>
        <button
     
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mt-2"
        >
          Create Comment
        </button>
      </div>
    </div>
    </div>
  );
};

export default AnimePage;
