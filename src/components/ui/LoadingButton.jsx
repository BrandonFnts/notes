export const LoadingButton = ({ label, isLoading, onClick }) => {
    return (
        <button className="btn" onClick={onClick}>
            {isLoading ? (
                <span className="loading loading-spinner"></span>
            ) : <></>}
            {label}
        </button>
    );
}