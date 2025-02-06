import React from 'react';
import { Todo } from '../../types/Todo';

interface TodoListProps {
  todos: Todo[];
  onTodoClick: (todo: Todo) => void;
  selectedTodoId: number | null; // Додамо пропс для вибраного todo
}

export const TodoList: React.FC<TodoListProps> = ({
  todos,
  onTodoClick,
  selectedTodoId,
}) => (
  <table className="table is-narrow is-fullwidth">
    <thead>
      <tr>
        <th>#</th>
        <th>
          <span className="icon">
            <i className="fas fa-check" />
          </span>
        </th>
        <th>Title</th>
        <th> </th>
      </tr>
    </thead>

    <tbody>
      {todos.map(todo => (
        <tr key={todo.id} data-cy="todo" onClick={() => onTodoClick(todo)}>
          <td>{todo.id}</td>
          <td>{todo.completed && <span data-cy="iconCompleted">✔</span>}</td>

          <td>{todo.title}</td>
          <td className="has-text-right">
            {selectedTodoId !== todo.id ? (
              <button
                data-cy="selectButton"
                className="button is-info"
                type="button"
                onClick={event => {
                  event.stopPropagation();
                  onTodoClick(todo); // Вибір завдання
                }}
              >
                <span className="icon">
                  <i className="far fa-eye" /> {/* Обычная кнопка */}
                </span>
              </button>
            ) : (
              <button
                data-cy="selectButton"
                className="button is-info"
                type="button"
                onClick={event => {
                  event.stopPropagation();
                  onTodoClick(todo); // Повторный выбор задачи для скрытия
                }}
              >
                <span className="icon">
                  <i className="fas fa-eye-slash" />{' '}
                </span>
              </button>
            )}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);
