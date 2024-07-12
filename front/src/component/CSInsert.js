import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import Navbar from 'react-bootstrap/Navbar';

const CSInsert = () => {
    const [csTitle, setCsTitle] = useState('');
    const [csContent, setCsContent] = useState('');
    const [csDate, setCsDate] = useState('');
    
    const navigate = useNavigate();

    useEffect(() => {
        const today = new Date().toISOString().substring(0, 10);
        setCsDate(today);
    }, []);

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        if (!csTitle.trim()) {
            alert('문의 제목을 입력해주세요.');
            return;
        }

        if (!csContent.trim()) {
            alert('문의 내용을 입력해주세요.');
            return;
        }
        
        try {
            const response = await axios.post('/api/cs/insert', {
                csTitle,
                csContent,
                csDate
            });
            console.log('Insert successful:', response.data);
            alert('입력하신 문의를 등록하였습니다.');           
            window.location.href = '/';
        } catch (error) {
            console.error('문의 등록 실패:', error);
            alert('문의 등록에 실패했습니다. 다시 시도해주세요.');
       }
    };

    const handleCancel = () => {
		navigate(`/`);
        {/*setCsTitle('');
        setCsContent('');*/}
    };

    return (
        <div>
            <Navbar variant='light' bg='light' expand='sm'>
                <Container fluid>
                    <Navbar.Brand style={{ display: 'flex', alignItems: 'center' }}>
                        <NavLink exact to="/">
                            <img
                                src="/samsamlogo.png"
                                width="80"
                                height="80"
                                className="d-inline-block align-top"
                                alt="Brand logo"
                            />
                        </NavLink>
                        <div className='main-title' style={{ marginLeft: '10px' }}>
                            <h1
                                style={{ fontWeight: 'bold', cursor: 'pointer' }}>
                                고객 문의
                            </h1>
                        </div>
                    </Navbar.Brand>
                </Container>
            </Navbar>
            <form onSubmit={handleFormSubmit}>
                <fieldset>
                    <div className='cs-update-all' style={{ display: 'flex', alignItems: 'center' }}>
                        <label className='cs-update-title' htmlFor="csTitle">문의 제목</label>
                        <input className='cs-update-title-text'
                            type="text"
                            id="csTitle"
                            value={csTitle}
                            onChange={(e) => setCsTitle(e.target.value)}
                            required
                        />
                    <div className='cs-update-btn'>
                        <button className='cs-update-canclebtn' type="button" onClick={handleCancel}>취소</button>
                        <button className='cs-update-submitbtn' type="submit">등록</button>
                    </div>
                    </div>
                    <div className='cs-update-content'>
                        <label className='cs-update-content-title' htmlFor="csContent">문의 내용</label>
                        <textarea
                            id="csContent"
                            rows="5"
                            value={csContent}
                            onChange={(e) => setCsContent(e.target.value)}
                            required
                        ></textarea>
                    </div>
                    <input
                        type="hidden"
                        id="csDate"
                        name="csDate"
                        value={csDate}
                    />
                </fieldset>
            </form>
            <div className='cs-update-to'>
                <Link to="/" className='btn cs-update-toselect'>전체 목록</Link>
            </div>
        </div>
    );
};

export default CSInsert;