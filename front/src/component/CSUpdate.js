import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams, NavLink, useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import Navbar from 'react-bootstrap/Navbar';

const CSUpdate = () => {
    const { csNumber } = useParams();
    const navigate = useNavigate();
    const [csTitle, setCsTitle] = useState('');
    const [csContent, setCsContent] = useState('');
    const [csDate, setCsDate] = useState('');
    const [initialTitle, setInitialTitle] = useState('');
    const [initialContent, setInitialContent] = useState('');

    useEffect(() => {
        const fetchCsDetail = async () => {
            try {
                const response = await axios.get(`/api/cs/select/${csNumber}`);
                const data = response.data;
                setCsTitle(data.csTitle);
                setCsContent(data.csContent);
                setCsDate(data.csDate.substring(0, 10));
                setInitialTitle(data.csTitle);
                setInitialContent(data.csContent);
            } catch (error) {
                console.error('Error fetching CS detail:', error);
            }
        };

        fetchCsDetail();
    }, [csNumber]);

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

        if (csTitle === initialTitle && csContent === initialContent) {
            alert('문의 내용이 변경되지 않았습니다.');
            return;
        }

        try {
            const response = await axios.put(`/api/cs/update/${csNumber}`, {
                csTitle,
                csContent,
                csDate,
            });
            console.log('Update successful:', response.data);
            alert('문의가 성공적으로 수정되었습니다.');
            navigate('/');
        } catch (error) {
            console.error('Error updating inquiry:', error);
            alert('문의 수정에 실패했습니다. 다시 시도해주세요.');
        }
    };

    const handleCancel = () => {
		navigate(`/CSSelectDetail/${csNumber}`);
        /*setCsTitle('');
        setCsContent('');*/
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
                                문의 수정
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
                        <button className='cs-update-canclebtn' type="button" onClick={handleCancel} >취소</button>
                        <button className='cs-update-submitbtn' type="submit">수정 완료</button>
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
                        value={csDate}
                        readOnly
                    />
                </fieldset>
            </form>
            <div className='cs-update-to'>
                <Link to="/" className='btn cs-update-toselect'>전체 목록</Link>
            </div>
        </div>
    );
};

export default CSUpdate;
