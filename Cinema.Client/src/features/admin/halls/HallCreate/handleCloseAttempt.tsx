import toast from "react-hot-toast";
import Button from "../../../../components/Button/Button";

export const handleCloseAttempt = (handleClose:()=>void) => {
            
            toast((t) => (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <span>Make sure you saved all changes</span>
                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'space-around' }}>
                        <Button
                            action={() => {
                                toast.dismiss(t.id);
                            }}
                            variant="outline"
                            color="var(--color-danger)"
                        >
                            Cancel
                        </Button>

                        <Button 
                            action={() => {
                                toast.dismiss(t.id);
                                handleClose()
                            }}
                        >
                            Close
                        </Button>
                    </div>
                </div>
            ), { 
                duration: Infinity,
                position: "top-center"
            });
};