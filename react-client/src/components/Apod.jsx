import React ,{ useState, useEffect }from 'react';
import styled from 'styled-components';
import axios from 'axios';
import access_token from '../../../config.js';

const Apod = (props) => {

  const [searchInput, setSearchInput] = useState('');
  const [apod, setApod] = useState(props.apod);
  const [newApod, setNewApod] = useState([]);
  // const [savedApod, setSavedApod] = useState([]);

  // const addToSaveList = () => {
  //   console.log(newApod, 'can i get newapod?')
  //   setNewApod([...newApod, apod]);
  // }

  const validateDate = (input) => {
    return (searchInput.match(/^\d{4}[./-]\d{2}[./-]\d{2}$/));
    alert("Please format dates in YYYY-MM-DD");
  }

  useEffect (() => {
    axios.get('/apod')
    .then((res) => {
      setApod(res.data);
      console.log(res.data);
    })
    .catch((err) => console.log('err', err))
  },[]);

  const searchPicture = (event) => {
    event.preventDefault();
    validateDate(searchInput);

    console.log('event.target.value', searchInput)
    setSearchInput('');

    axios.get(`https://api.nasa.gov/planetary/apod?api_key=${access_token.KEY}&date=${searchInput}`)
    .then((res) => {
      const pickedApodData = (({ title, explanation, date, url }) => ({
        title, explanation, date, url
      }))(res.data);
      console.log('fetch API success!', pickedApodData);
      setApod(pickedApodData);
    })
    .catch((err) => console.log('failed to fetch apod'));
  }

  const handleChange =(e) => {
    setSearchInput(e.target.value);
  }

  return props.showApod ?
  (
    <div>
    <SearchBar>
      <form>
        <StyledInput type="text" id="search" value={searchInput} name="search" placeholder="Enter YYYY-MM-DD" onChange={handleChange}/>
        <SearchButton onClick={searchPicture}>
          Search
        </SearchButton>
      </form>
    </SearchBar>
    <ApodCard>
      <Add onClick={props.addToSaveList}>+</Add>
      <Title>Astronomy Picture of The Day</Title>
      <Date>{apod.date}</Date>
      <ApodImg src={apod.url}></ApodImg>
      <Subheading>{apod.title}</Subheading>
      <Description>{apod.explanation}</Description>
    </ApodCard>
    </div>
  ) : null
}

const Add = styled.button`
margin-top: 12px;
  margin-left: 9px;
  outline: none;
  margin-left:5px;
  padding-top: 5px;
  padding-bottom: 3px;
  padding-left: 10px;
  padding-right: 10px;
  font-size: 20px;
  border-radius: 45px;
  border: 1px solid #cecdcd;
  background-color: #f5f5f5;
  letter-spacing: 0.7px;
  font-size: 20px;
  cursor: pointer;
  &: hover {
    border: 1px solid #e57b7b;
    background-color: white;
  }
`;

const SearchBar = styled.div`
  text-align: right;
  margin: 0 auto;
  width: 55%;
`;

const StyledInput = styled.input`
  margin-top: 10px;
  text-align: right;
  width: 30%;
  height: 40px;
  border-radius: 15px;
  border: 1px solid #f7f5f5;;
  background-color: #f5eded;
  &: hover {
    border: 1px solid #e57b7b;
    background-color: white;
  }
`;

const SearchButton = styled.button`
  outline: none;
  margin-left:5px;
  height: 40px;
  border-radius: 45px;
  border: 1px solid #e5e2e2;;
  background-color: #f5f5f5;
  letter-spacing: 0.7px;
  font-size: 14px;
  cursor: pointer;
  &: hover {
    border: 1px solid #e57b7b;
    background-color: white;
  }
`;

const Title = styled.div`
  padding-top: 25px;
  font-size: 30px;
  text-align: center;
`;

const Subheading = styled.div`
  font-size: 23px;
  text-align: center;
`;

const Description = styled.div`
  margin: 18px 40px;
  font-size: 16px;
  font-family: arial;
  line-height: 1.3;
`;

const Date = styled.div`
  margin: 18px 40px;
  font-size: 14px;
  font-family: arial;
  line-height: 1;
  text-align: center;
  font-family: monospace;
`;

const ApodCard = styled.div`
  margin: 0 auto;
  width: 55%;
  border-radius: 15px;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  margin-top: 20px;
  padding-bottom: 20px;
  font-size: 30px;
`;

const ApodImg = styled.img`
  width: 50%;
  display: block;
  border-radius: 15px;
  margin: 35px auto;
`;

export default Apod;