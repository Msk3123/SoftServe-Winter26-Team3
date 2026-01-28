import styles from "./Pagination.module.css";
import Button from "../Button/Button";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (pageNumber: number) => void;
    maxButtons?: number;
}

const Pagination= ({
    currentPage,
    totalPages,
    onPageChange,
    maxButtons = 5
}:PaginationProps ) => {

    const getPageNumbers = () => {
        const pages = [];
        const half = Math.floor(maxButtons / 2);
        let start = Math.max(1, currentPage - half);
        let end = Math.min(totalPages, currentPage + half);

        if (end - start + 1 < maxButtons) {
            if (start === 1) {
                end = Math.min(totalPages, start + maxButtons - 1);
            } else if (end === totalPages) {
                start = Math.max(1, end - maxButtons + 1);
            }
        }

        for (let i = start; i <= end; i++) {
            pages.push(i);
        }
        return pages;
    };

    const pageNumbers = getPageNumbers();


    return (
        <div className={styles.container}>
            <Button
                className={styles.navBtn}
                action={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                aria-label="Previous Page"
            >
                {"<"}
            </Button>


            {pageNumbers[0] > 1 && (
                <>
                    <Button
                        variant="text-only"
                        color = "var(--text-secondary)"
                        className={`${styles.baseBtn} ${styles.inactiveBtn}`}
                        action={() => onPageChange(1)}
                    >
                        1
                    </Button>
                    {pageNumbers[0] > 2 && <span className={styles.dots}>...</span>}
                </>
            )}

            {pageNumbers.map((num) => (
                <Button
                    variant="text-only"
                    color = "var(--text-secondary)"
                    key={num}
                    action={() => onPageChange(num)}
                    className={`
                        ${styles.baseBtn}
                        ${currentPage === num ? styles.activeBtn : styles.inactiveBtn}
                    `}
                >
                    {num}
                </Button>
            ))}

            {pageNumbers[pageNumbers.length - 1] < totalPages && (
                <>
                    {pageNumbers[pageNumbers.length - 1] < totalPages - 1 && <span className="text-gray-400 px-1">...</span>}
                    <Button
                        variant="text-only"
                        color = "var(--text-secondary)"
                        className={`${styles.baseBtn} ${styles.inactiveBtn}`}
                        action={() => onPageChange(totalPages)}
                    >
                        {totalPages}
                    </Button>
                </>
            )}


            <Button
                className={styles.navBtn}
                action={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                {">"}
            </Button>
        </div>
    );
};

export default Pagination;