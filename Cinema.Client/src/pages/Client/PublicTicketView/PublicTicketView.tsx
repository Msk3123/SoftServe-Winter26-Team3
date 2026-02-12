import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import { getList } from '../../../api/api';
import { formatDate } from '../../../helpers/dateHelpers';

const SecureTicketView = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [error, setError] = useState('');

    useEffect(() => {
        getList(`Ticket/my-ticket/${id}`)
            .then((ticket: any) => {
                const doc = new jsPDF();
                
                doc.setFillColor(18, 18, 18);
                doc.rect(0, 0, 210, 297, 'F');
                
                doc.setTextColor(0, 223, 130);
                doc.setFontSize(26);
                doc.text('CINEMAS TICKET', 20, 40);
                
                doc.setTextColor(255, 255, 255);
                doc.setFontSize(14);
                doc.text(`Movie: ${ticket.movieTitle}`, 20, 60);
                doc.text(`Date: ${formatDate(ticket.showtime)}`, 20, 70);
                doc.text(`Hall: ${ticket.hallName}`, 20, 80);
                doc.text(`Row: ${ticket.row} | Seat: ${ticket.seatNo}`, 20, 90);
                doc.text(`Price: ${ticket.price} UAH`, 20, 100);
                
                doc.setDrawColor(0, 223, 130);
                doc.line(20, 110, 190, 110);
                doc.text(`Ticket ID: #${ticket.id}`, 20, 120);

                const blob = doc.output('bloburl');
                window.location.replace(blob); 
            })
            .catch((err) => {
                setError("Access Denied: You are not the owner of this ticket.");
                setTimeout(() => navigate('/profile'), 3000);
            });
    }, [id, navigate]);

    return (
        <div style={{ background: '#121212', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
            {error ? <h2 style={{ color: '#ff4d4d' }}>{error}</h2> : <h2>Verifying ownership...</h2>}
        </div>
    );
};

export default SecureTicketView;