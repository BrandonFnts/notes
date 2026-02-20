export const LoadingButton = ({ label, isLoading, onClick, type = "button", className = "", disabled = false }) => {
    return (
        <button className={`btn ${className}`} onClick={onClick} type={type} disabled={disabled || isLoading}>
            {isLoading ? (
                <span className="loading loading-spinner"></span>
            ) : <></>}
            {label}
        </button>
    );
}