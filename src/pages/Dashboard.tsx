import { Show, useShows } from '../api/show-api-utils';
import Card from '../components/Card';
import React, { useMemo } from 'react';
import { useErrorBoundary } from 'react-error-boundary';
import Modal from '../components/Modal';
import ShowDetails from '../components/show/ShowDetails';

type CategoryMap = {
  [category: string]: Show[];
};

const createCategoryMap = (shows: Show[]): CategoryMap => {
  const categoryMap: CategoryMap = {};
  // CLASSIFY SHOWS BY GENRE
  shows.forEach((show) => {
    show.genres.forEach((genre) => {
      categoryMap[genre] = (categoryMap[genre] || []).concat(show);
    });
  });
  // SORT SHOWS BY POPULARITY WITHING EACH CATEGORY
  Object.keys(categoryMap).forEach((category) => {
    categoryMap[category].sort((first, second) => second.weight - first.weight);
  });
  return categoryMap;
};

const Dashboard: React.FC = (): JSX.Element => {
  const { data: shows, isError } = useShows();
  const { showBoundary } = useErrorBoundary();
  if (isError) showBoundary(null);

  // MEMOIZE THE CREATED CATEGORY MAP
  const showsByCategory = useMemo(() => createCategoryMap(shows || []), [shows]);

  return (
    <div>
      {shows &&
        Object.keys(showsByCategory)
          .sort() // SORT CATEGORIES ALPHABETICALLY
          .map((category) => {
            return (
              <section key={category}>
                <p className="text-3xl pt-5 pb-1 font-bold">{category}</p>
                <div className="flex overflow-x-auto rounded-lg">
                  {showsByCategory[category].map((show) => {
                    return (
                      // RENDER A MODAL TRIGGERED BY CLICKING ON A SHOW CARD
                      <div className="flex-shrink-0" key={show.id}>
                        <Modal
                          triggerElement={
                            <Card imageUrl={show.image?.medium} imageAlt={show.name} />
                          }
                        >
                          <Modal.Content>
                            <ShowDetails show={show} />
                          </Modal.Content>
                        </Modal>
                      </div>
                    );
                  })}
                </div>
              </section>
            );
          })}
    </div>
  );
};

export default Dashboard;
