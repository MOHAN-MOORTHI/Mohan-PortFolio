const Loading = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-dark-bg">
            <div className="relative w-24 h-24">
                <div className="absolute top-0 left-0 w-full h-full border-4 border-white/10 rounded-full"></div>
                <div className="absolute top-0 left-0 w-full h-full border-4 border-t-secondary rounded-full animate-spin"></div>
            </div>
        </div>
    );
};

export default Loading;
