import { Todo } from './types/Todo';
import { User } from './types/User';

// eslint-disable-next-line operator-linebreak
const BASE_URL =
  'https://mate-academy.github.io/react_dynamic-list-of-todos/api';

export function getUsers(): Promise<User[]> {
  return fetch(`${BASE_URL}/users.json`).then(response => {
    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }

    return response.json();
  });
}

// This function creates a promise
// that is resolved after a given delay
function wait(delay: number): Promise<void> {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

function get<T>(url: string): Promise<T> {
  // eslint-disable-next-line prefer-template
  const fullURL = `${BASE_URL}${url}.json`;

  return fetch(fullURL)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Failed to load data from ${fullURL}`);
      }

      return response.json();
    })
    .then(data => wait(300).then(() => data));
}

export const getTodos = () => get<Todo[]>('/todos');

export const getUser = (userId: number) => get<User>(`/users/${userId}`);

/*
export const getTodos = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos');
  const data = await response.json();
  return data;
};

export const getUsers = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  const data = await response.json();
  return data;
};

*/
