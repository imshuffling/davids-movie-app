import React from "react";
import Wrapper from "../../components/wrapper";
import Image from "next/image";

function Movie({ data, reviewData }) {
  return (
    <Wrapper>
      <div className="grid gap-10 md:grid-cols-2">
        <div>
          <Image
            src={`https://image.tmdb.org/t/p/original/${data.poster_path}`}
            alt={data.title}
            width={800}
            height={800}
          />
        </div>
        <div>
          <h1 className="text-2xl mb-2">{data.title}</h1>
          <div className="items-center justify-center rounded-bl-lg border border-transparent py-4 text-sm font-medium text-gray-700 hover:text-gray-500">
            <span>Rating: {data.vote_average}</span>
          </div>
          <p>{data.overview}</p>
          <h3 className="mt-10 mb-5 text-3xl">{`${
            reviewData?.results.length ? "Reviews" : "No reviews"
          }`}</h3>
          <ul>
            {reviewData?.results?.map((review) => {
              return (
                <li key={review.id} className="mb-2 mt-3">
                  <h4 className="font-bold">{review.author}</h4>
                  <p>Rating: {review.author_details.rating}</p>
                  <p>{review.content}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </Wrapper>
  );
}

export default Movie;

export async function getServerSideProps({ params, query }) {
  const api_key = query.api_key;
  const id = params.id;

  const res = await fetch(
    `http://api.themoviedb.org/3/movie/${id}?api_key=${api_key}`
  );
  const data = await res.json();

  // Get reviews
  const getReviews = await fetch(
    `http://api.themoviedb.org/3/movie/${id}/reviews?api_key=${api_key}`
  );
  const reviewData = await getReviews.json();

  return { props: { data, reviewData } };
}
