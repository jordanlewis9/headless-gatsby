import React, { useState, useEffect } from 'react';
import { Link } from 'gatsby';
import axios from 'axios';
import * as styles from './Blogs.module.scss';

const Blogs = (props) => {
    const curRoot = 'http://headless.local';
    const [filter, setFilter] = useState('');
    const [posts, setPosts] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState();
    const [totalPages, setTotalPages] = useState();
    const [categories, setCategories] = useState();
    const [selectedCategories, setSelectedCategories] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const blogs = await axios.get(`${curRoot}/wp-json/wp/v2/search?page=1`);
                const terms = await axios.get(`${curRoot}/wp-json/wp/v2/categories`);
                console.log(terms);
                console.log(blogs);
                setPosts(blogs.data);
                setCategories(terms.data);
                setTotalItems(blogs.headers['x-wp-total']);
                setTotalPages(blogs.headers['x-wp-totalpages'])
            } catch (err) {
                console.log(err);
            }
        }
        fetchData();
    }, [])

    const renderPosts = (blogs) => {
        return blogs.map(blog => (
            <div key={blog.id}>
                <h3 className={styles.header}>
                    <Link to={blog.url ? blog.url.replace(curRoot, '') : `/${blog.slug}`}>{blog.title.rendered ? blog.title.rendered : blog.title}</Link>
                </h3>
            </div>
        ))
    }

    const renderCheckboxes = (terms) => {
        return terms.map(term => (
            <div key={term.id}>
                <label>{term.name}</label>
                <input onChange={handleCheckbox} type="checkbox" value={term.id} name="categories" checked={selectedCategories.includes(`${term.id}`)}/>
            </div>
        ))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const blogs = await axios.get(`${curRoot}/wp-json/wp/v2/search?page=1&search=${filter}`);
            setPosts(blogs.data);
            setCurrentPage(1);
            setTotalItems(blogs.headers['x-wp-total']);
            setTotalPages(blogs.headers['x-wp-totalpages']);
            setSelectedCategories([]);
        } catch (err) {
            console.error(err);
        }
    }

    const handleCheckbox = async (e) => {
        try {
            if (e.target.checked === true) {
                const blogs = await axios.get(`${curRoot}/wp-json/wp/v2/posts?tax_relation=OR&categories=${selectedCategories.join(',')},${e.target.value}&page=1`);
                setPosts(blogs.data);
                setCurrentPage(1);
                setTotalItems(blogs.headers['x-wp-total']);
                setTotalPages(blogs.headers['x-wp-totalpages']);
                setSelectedCategories([...selectedCategories, e.target.value]);
                setFilter('');
            } else {
                if (selectedCategories.length === 1) {
                    const blogs = await axios.get(`${curRoot}/wp-json/wp/v2/search?page=1`);
                    setPosts(blogs.data);
                    setCurrentPage(1);
                    setTotalItems(blogs.headers['x-wp-total']);
                    setTotalPages(blogs.headers['x-wp-totalpages']);
                    setSelectedCategories([]);
                    setFilter('');
                } else {
                    const blogs = await axios.get(`${curRoot}/wp-json/wp/v2/posts?tax_relation=OR&categories=${selectedCategories.filter(cat => cat !== e.target.value).join(',')}&page=1`);
                    setPosts(blogs.data);
                    setCurrentPage(1);
                    setTotalItems(blogs.headers['x-wp-total']);
                    setTotalPages(blogs.headers['x-wp-totalpages']);
                    setSelectedCategories([...selectedCategories.filter(cat => cat !== e.target.value)])
                    setFilter('');
                }
            }
        } catch(err) {
            console.error(err);
        }
    }

    const handleNextPage = async (e) => {
        try {
            if (filter) {
                const blogs = await axios.get(`${curRoot}/wp-json/wp/v2/search?search=${filter}&page=${currentPage + 1}`);
                setPosts(blogs.data);
                setCurrentPage(currentPage + 1);
            } else if (selectedCategories.length > 0) {
                const blogs = await axios.get(`${curRoot}/wp-json/wp/v2/posts?tax_relation=OR&categories=${selectedCategories.join(',')}&page=${currentPage + 1}`);
                setPosts(blogs.data);
                setCurrentPage(currentPage + 1);
            } else {
                const blogs = await axios.get(`${curRoot}/wp-json/wp/v2/search?page=${currentPage + 1}`);
                setPosts(blogs.data);
                setCurrentPage(currentPage + 1);
            }
        } catch (err) {
            console.error(err);
        }
    }

    const handlePrevPage = async (e) => {
        try {
            if (filter) {
                const blogs = await axios.get(`${curRoot}/wp-json/wp/v2/search?search=${filter}&page=${currentPage - 1}`);
                setPosts(blogs.data);
                setCurrentPage(currentPage - 1);
            } else if (selectedCategories.length > 0) {
                const blogs = await axios.get(`${curRoot}/wp-json/wp/v2/posts?tax_relation=OR&categories=${selectedCategories.join(',')}&page=${currentPage - 1}`);
                setPosts(blogs.data);
                setCurrentPage(currentPage - 1);
            } else {
                const blogs = await axios.get(`${curRoot}/wp-json/wp/v2/search?page=${currentPage - 1}`);
                setPosts(blogs.data);
                setCurrentPage(currentPage - 1);
            }
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div>
            <form action="GET" onSubmit={handleSubmit}>
                <input type="text" onChange={(e) => setFilter(e.target.value)} value={filter}/>
                <button type="submit">Submit</button>
            </form>
            <form action="GET">
                {categories && renderCheckboxes(categories)}
            </form>
            {posts && renderPosts(posts)}
            <div>
                {currentPage > 1 && <button onClick={handlePrevPage}>{currentPage - 1}</button>}
                {currentPage}
                {currentPage < totalPages && <button onClick={handleNextPage}>{currentPage + 1}</button>}
            </div>
        </div>
    )
}

  export default Blogs;