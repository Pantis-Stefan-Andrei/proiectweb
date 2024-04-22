import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './start.css';

const RatingChart = () => {
  const [comments, setComments] = useState([]);
  const [chartLoaded, setChartLoaded] = useState(false);

  useEffect(() => {
    // Dynamically import ChartJS library
    import('chart.js/auto').then(() => {
      setChartLoaded(true);
    }).catch(error => {
      console.error('Error loading ChartJS library:', error);
    });

    const fetchComments = async () => {
      try {
        const response = await axios.get(`https://sundbserver.azurewebsites.net/api/allcomments`);
      
        setComments(response.data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchComments();
  }, []);

  const getStarRatings = () => {
    const ratings = [0, 0, 0, 0, 0]; // Initialize an array to store count of each rating
    comments.forEach(comment => {
      ratings[comment.rating - 1]++; // Assuming rating ranges from 1 to 5
    });
    return ratings;
  };

  const renderChart = () => {
    
    if (!chartLoaded) {
      return <div>Loading chart...</div>;
    }

    const data = {
      labels: ['1 Stea', '2 Stele', '3 Stele', '4 Stele', '5 Stele'],
      datasets: [
        {
          label: 'Numar de recenzii',
          backgroundColor: 'rgba(75,192,192,1)',
          borderColor: 'rgba(0,0,0,1)',
          borderWidth: 1,
          data: getStarRatings(),
        },
      ],
    };

    return (
      <Bar
        data={data}
        options={{
          indexAxis: 'y',
          plugins: {
            legend: {
              display: false,
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                stepSize: 1,
              },
            },
          },
          maintainAspectRatio: false, // Allow the chart to adjust its size based on the container size
          responsive: true, // Make the chart responsive
          aspectRatio: 2, // Set the aspect ratio to control the height of the chart
        }}
      />
    );
  };
  function shuffleArray(array) {
    // Create a copy of the original array
    const shuffledArray = [...array];
    
    // Fisher-Yates shuffle algorithm
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    
    return shuffledArray;
  }
  const shuffledComments = shuffleArray(comments);

  // Get the top four shuffled comments
  const topFourShuffledComments = shuffledComments.slice(0, 4);
  const [slidesToShow, setSlidesToShow] = useState(calculateSlidesToShow());

  useEffect(() => {
    function handleResize() {
      // Update slides to show when window is resized
      setSlidesToShow(calculateSlidesToShow());
    }

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Remove event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  function calculateSlidesToShow() {
    // Calculate the number of slides to show based on viewport width
    const viewportWidth = window.innerWidth;
    if (viewportWidth >= 1200) {
      return 4;
    } else if (viewportWidth >= 992) {
      return 3;
    } else if (viewportWidth >= 768) {
      return 2;
    } else {
      return 1;
    }
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: slidesToShow, // You can adjust this according to your requirements
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
  };

  return (
    <div className="allclass">
    <div className="slideshow-container">
    <Slider {...{ ...settings, infinite: true }}>
  {[...Array(12).keys()].map((index) => ( // Loop from 0 to 11
    <div key={index}>
      {/* Slide content */}
      <img style={{ width: '100%' }} src={`${index + 1}.jpeg`} alt={`Slide ${index + 1}`} />
    </div>
  ))}
</Slider>
</div>

      <div className="chart-container">
        <div style={{ width: '80%', margin: 'auto', paddingTop: '50px' }}>
          {renderChart()}
        </div>

        <div className="top-comments-container">
      <h2>Top Reactii:</h2>
      <ul className="comment-list">
        {topFourShuffledComments.map((comment, index) => (
          <li className="comment-item" key={index}>
            <strong>Echipamentul:</strong> {comment.productId} <br />
            <strong>Reactia:</strong> {comment.content}
          </li>
        ))}
      </ul>
    </div>
      </div>
    </div>
  );
};

export default RatingChart;
