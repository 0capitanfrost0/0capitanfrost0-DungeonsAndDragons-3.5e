import './NotFound.css';

function NotFound() {
    return <div className="NotFound-container">
        <h1>404 Not Found</h1>
        <p>The page you're looking for doesn't exist!</p>
        <p>If you are lost , go <a href='http://localhost:5173/'>main page</a></p>
    </div>
}

export default NotFound