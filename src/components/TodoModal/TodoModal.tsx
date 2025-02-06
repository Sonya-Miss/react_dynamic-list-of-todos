import React, { useEffect, useState } from 'react';
import { User } from '../../types/User';
import { Todo } from '../../types/Todo';
import { getUser } from '../../api';
import { Loader } from '../Loader';

interface Props {
  todo: Todo;
  user: User | null;
  onClose: () => void;
}

export const TodoModal: React.FC<Props> = ({ todo, onClose }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    getUser(todo.userId)
      .then(fetchedUser => setUser(fetchedUser))
      .catch(error => {
        // eslint-disable-next-line no-console
        console.error('Error fetching user:', error);
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, [todo.userId]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" onClick={onClose} />
      <div className="modal-content box" data-cy="todo">
        <button
          className="delete"
          aria-label="close"
          onClick={onClose}
          data-cy="modal-close"
        />

        {loading && <Loader data-cy="loader" />}

        {!loading && (
          <div>
            <h2 className="title" data-cy="modal-title">
              Todo #{todo.id}
            </h2>
            <p data-cy="modal-status">
              <strong>Status:</strong> {todo.completed ? 'Completed' : 'Active'}
            </p>
            <p data-cy="modal-user">
              <strong>User:</strong> {user ? user.name : 'Unknown'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
