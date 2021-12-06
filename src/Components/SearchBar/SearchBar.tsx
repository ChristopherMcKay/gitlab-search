import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Flex, Input, Text, InputRightElement, IconButton, InputGroup } from "@chakra-ui/react";
import { SearchIcon } from '@chakra-ui/icons';
import './SearchBar.css';

const SearchBar: React.FC = () => {
  const [inputValue, setInputValue] = useState('');

  const history = useHistory();

  return (
    <Flex justify="center" align="center" className="top-bar">
      <Text className="title" onClick={() => history.push('/')}>
        GitLab Search
      </Text>
      <InputGroup justifySelf="flex-end" style={{width: '400px'}} onKeyPress={(e) => {
        if (e.key === 'Enter') {
          history.push(`/results/${inputValue}`)
        }
      }}>
        <Input onChange={(e) => setInputValue(e.target.value)} backgroundColor="#FFF" />
        <InputRightElement width='3.0rem'>
          <IconButton disabled={!inputValue} aria-label="search" h='1.75rem' size='sm' onClick={() => history.push(`/results/${inputValue}`)}>
            <SearchIcon />
          </IconButton>
        </InputRightElement>
      </InputGroup>
    </Flex>
  );
}

export default SearchBar;