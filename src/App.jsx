import { useState, Alert } from 'react'
import axios from 'axios';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Card, Flex, Switch, Space, Button, Input, Descriptions, Radio,
  Table, Tag
 } from 'antd';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Routes, Route, Link } from 'react-router-dom';
import { Collapse, Divider } from 'antd';

const { Search } = Input;

import './App.css'

function Home() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}

const actions = [
  <EditOutlined key="edit" />,
  <SettingOutlined key="setting" />,
  <EllipsisOutlined key="ellipsis" />,
];

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: 'Total Score',
    dataIndex: 'total_score',
    key: 'total_score',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Higher Scores',
    dataIndex: 'higher',
    key: 'higher',
  },
  {
    title: 'Measured Faculties',
    key: 'measured_cognitive_faculties',
    dataIndex: 'measured_cognitive_faculties',
    render: (_, { measured_cognitive_faculties }) => (
      <>
        {measured_cognitive_faculties.map((tag) => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === 'loser') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  }
];

function App() {
  const [count, setCount] = useState(0);
  const [testName, setTestName] = useState('');
  const [testData, setTestData] = useState();
  const [requestInProgress, setRequestInProgress] = useState(false)

  const onSearch = async (e) => {
    // e.preventDefault();
    setRequestInProgress(true)
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };
      console.log(testName)
      const data = {name : testName}
      const response = await axios.post('http://localhost:8000/np/desc', data, config);
      console.log('Response:', response.data);
      setTestData({...response.data, name: testName})
      setTestName();
      setRequestInProgress(false);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  const data = [
    {
      key: '1',
      higher: 'John Brown',
      total_score: 32,
      address: 'New York No. 1 Lake Park',
      measured_cognitive_faculties: ['nice', 'developer'],
    }
  ];

  return (
    <>
      <div style={{display: 'flex', flexDirection: 'column'}}>
      <Flex gap="large" align="center" vertical>
      <Search 
      style={{width: '80vh'}}
      placeholder="enter a cognitive instrument name"  
      enterButton
      value={testName}
      onChange={(e) => setTestName(e.target.value)} 
      onSearch={onSearch}
      loading={requestInProgress}
      />
      {(requestInProgress || testData) && <Card
        loading={requestInProgress}
        actions={actions}
        style={{
          minWidth: '50vw',
          maxWidth: '80vw',
        }}
      >
      {testData && <Card.Meta
          avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" />}
          title={testData.test_name}
          description={
            <>
              {testData.description}
              <Table 
              columns={columns} 
              dataSource={[{key: '1', ...testData}]} 
              pagination={{
                position: ['none', 'none'],
              }}
              />
      <Collapse
      size="large"
      items={[
        {
          key: '1',
          label: `Test Subcomponents: ${testData.subcomponents.length || 'NA'}`,
          children: <Table 
          columns={columns} 
          dataSource={testData.subcomponents.map(({higher, score, subcomponent_name, measured_cognitive_faculties}, idx) => {
            return {
              key: `${idx}`,
              name: subcomponent_name,
              total_score: score,
              measured_cognitive_faculties,
              higher
            }
          })} 
          pagination={{
            position: ['none', 'none'],
          }}
          />,
        },
      ]}
    />
            </>
          }
        />}
        
      </Card>
}
      </Flex>
    </div>
    
      {/* <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
      </nav> */}

      {/* <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes> */}
    {/* </div> */}
      {/* <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div> */}
      {/* <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div> */}
      {/* <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
    </>
  )
}

export default App
