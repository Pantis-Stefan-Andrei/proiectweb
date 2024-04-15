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
        const response = await axios.get(`http://localhost:5000/api/allcomments`);
      
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

  const topFourComments = comments.filter(comment => comment.rating === 5).slice(0, 4);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
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
          <ul>
            {topFourComments.map((comment, index) => (
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
