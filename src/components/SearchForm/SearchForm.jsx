import { useState } from 'react';
import { toast } from 'react-toastify';

import { Form, Button, ButtonLabel, Input } from './SearchForm.styled';

export const SearchForm = ({ onSubmit }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleQueryChange = ({ currentTarget: { value } }) => {
    setSearchQuery(value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();
    const search = searchQuery.trim();

    if (search === '') {
      toast.error('🦄 Please, enter search request!');
      return;
    }

    onSubmit(search);
    setSearchQuery('');
  };
  return (
    <Form onSubmit={handleSubmit}>
      <Button type="submit">
        <ButtonLabel>Search</ButtonLabel>
      </Button>

      <Input
        className="input"
        type="text"
        autocomplete="off"
        autoFocus
        placeholder="Search images and photos"
        name="searchQuery"
        value={searchQuery}
        onChange={handleQueryChange}
      />
    </Form>
  );
};
