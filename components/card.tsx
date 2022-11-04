import Image from "next/image";
import moment from "moment";

interface cardTypes {
  id: any;
  title: string;
  overview: string;
  poster_path: string;
  rating: string;
  date: string;
  media_type: string;
}

function Card({
  id,
  title,
  overview,
  poster_path,
  rating,
  date,
  media_type,
}: cardTypes) {
  return (
    <div
      key={id}
      className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow"
    >
      <div className="flex flex-1 flex-col p-8">
        <Image
          className="mx-auto flex-shrink-0"
          src={`${
            poster_path
              ? `https://image.tmdb.org/t/p/w300/${poster_path}`
              : `https://critics.io/img/movies/poster-placeholder.png`
          }`}
          alt={title}
          width={500}
          height={500}
        />

        <h3 className="mt-6 text-sm font-medium text-gray-900">{title}</h3>
        <dl className="mt-1 flex flex-grow flex-col justify-between">
          <dt className="sr-only">Overview</dt>
          <dd className="text-sm text-gray-500 line-clamp-2">{overview}</dd>
          {media_type && (
            <dd className="mt-3">
              <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                {media_type}
              </span>
            </dd>
          )}
        </dl>
      </div>
      <div>
        <div className="-mt-px flex divide-x divide-gray-200">
          <div className="flex w-0 flex-1">
            <div className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center rounded-bl-lg border border-transparent py-4 text-sm font-medium text-gray-700 hover:text-gray-500">
              <span>Rating: {rating}</span>
            </div>
          </div>
          <div className="-ml-px flex w-0 flex-1">
            <div className="relative inline-flex w-0 flex-1 items-center justify-center rounded-br-lg border border-transparent py-4 text-sm font-medium text-gray-700 hover:text-gray-500">
              <span>{moment(date).format("YYYY")}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
