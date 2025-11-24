import { useState } from 'react';
import { Skull, Download } from 'lucide-react';
import Button from '../../../components/Button';
import Card from '../../../components/Card';

import jsPDF from 'jspdf';
import JSZip from 'jszip';

const VampireEnded = ({ players, gameLog }) => {
  const [loading, setLoading] = useState(false);

  const generateAndDownload = async () => {
    setLoading(true);
    try {
        const zip = new JSZip();

        // 1. Generate Log PDF
        const logDoc = new jsPDF();
        logDoc.setFont("helvetica", "bold");
        logDoc.text("Registro de la Crónica", 10, 10);
        logDoc.setFont("helvetica", "normal");
        logDoc.setFontSize(10);
        
        let y = 20;
        let lastTurn = -1;

        gameLog.forEach(log => {
            if (y > 270) { logDoc.addPage(); y = 10; }
            
            // Header for turn/player only if it changes or is main entry
            if (!log.isSubEntry || log.turn !== lastTurn) {
                y += 5;
                logDoc.setFont("helvetica", "bold");
                logDoc.text(`Turno ${log.turn} - ${log.player}`, 10, y);
                y += 5;
                logDoc.setFont("helvetica", "normal");
                lastTurn = log.turn;
            }

            log.events.forEach(event => {
                const lines = logDoc.splitTextToSize(`- ${event}`, 180);
                if (y + (lines.length * 5) > 280) { logDoc.addPage(); y = 10; }
                logDoc.text(lines, 15, y);
                y += (lines.length * 5);
            });
        });
        zip.file("Registro_Cronica.pdf", logDoc.output('blob'));

        // 2. Generate Player Sheets (Standard info)
        players.forEach(p => {
            const doc = new jsPDF();
            doc.setFontSize(22);
            doc.text(p.vampireName, 10, 20);
            doc.setFontSize(12);
            doc.text(`Jugador: ${p.playerName}`, 10, 30);
            doc.text(`Estado Final: Evento ${p.currentEvent}`, 10, 36);
            doc.text(`Marca: ${p.mark}`, 10, 42);

            let y = 55;
            
            // Skills
            doc.setFontSize(14); doc.text("Talentos", 10, y); y += 7;
            doc.setFontSize(10);
            p.skills.forEach(s => {
                doc.text(`[${s.isLost ? 'X' : ' '}] ${s.name} ${s.isChecked ? '(Usado)' : ''}`, 10, y);
                y += 5;
            });
            y += 5;

            // Resources
            doc.setFontSize(14); doc.text("Recursos", 10, y); y += 7;
            doc.setFontSize(10);
            p.resources.forEach(r => {
                doc.text(`[${r.isLost ? 'X' : ' '}] ${r.name}`, 10, y);
                y += 5;
            });
            y += 5;

            // Characters
            doc.setFontSize(14); doc.text("Personajes", 10, y); y += 7;
            doc.setFontSize(10);
            p.characters.forEach(c => {
                const status = c.isImmortal ? "[I]" : "[M]";
                const dead = c.isDead ? "(Muerto)" : "";
                doc.text(`[${c.isDead ? 'X' : ' '}] ${status} ${c.name} ${dead}: ${c.desc}`, 10, y);
                y += 5;
            });
            y += 10;

            // Memories
            if(y > 200) { doc.addPage(); y = 20; }
            doc.setFontSize(14); doc.text("Recuerdos", 10, y); y += 10;
            doc.setFontSize(10);
            
            p.memories.forEach(m => {
                const prefix = m.isDiary ? "(Diario) " : "";
                const content = prefix + m.experiences.join(" -> ");
                const lines = doc.splitTextToSize(content, 180);
                if(y + (lines.length * 5) > 280) { doc.addPage(); y = 20; }
                doc.text(lines, 10, y);
                y += (lines.length * 5) + 5;
            });

            zip.file(`Ficha_${p.vampireName.replace(/\s+/g, '_')}.pdf`, doc.output('blob'));
        });

        // 3. Download
        const content = await zip.generateAsync({ type: "blob" });
        const url = window.URL.createObjectURL(content);
        const a = document.createElement("a");
        a.href = url;
        a.download = "Cronica_Vampiros.zip";
        a.click();
        window.URL.revokeObjectURL(url);
    } catch (e) {
        alert("Error generando archivos: " + e.message);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-black text-neutral-300 flex flex-col items-center justify-center p-6 font-serif">
       <Card className="max-w-xl w-full text-center space-y-6">
          <Skull className="w-16 h-16 mx-auto text-red-900" />
          <h2 className="text-3xl text-red-500 font-bold">La Crónica ha Terminado</h2>
          <p className="text-neutral-400">
             Los mil años han pasado, o quizás el sol finalmente os ha alcanzado.
             Aquí podéis descargar un registro completo de vuestra caída.
          </p>
          <div className="bg-neutral-950 p-4 rounded text-left max-h-40 overflow-y-auto text-xs text-neutral-500 border border-neutral-800">
            {gameLog.map((l, i) => (
                <div key={i} className="mb-1">
                    <span className="text-red-900 font-bold">T{l.turn}:</span> {l.player} {l.events.join(", ").substring(0,50)}...
                </div>
            ))}
          </div>
          <Button onClick={generateAndDownload} className="w-full py-4 text-lg" disabled={loading} variant="primary">
            {loading ? "Generando..." : "Descargar Archivos (.zip)"} <Download className="w-5 h-5"/>
          </Button>
       </Card>
    </div>
  );
};

export default VampireEnded;
