import { SEO } from '../components/common/SEO';

const PrivacyPolicy = () => {
    return (
        <div className="min-h-screen bg-white pt-24 pb-16">
            <SEO
                title="Privacy Policy | Centro Lavaggio Mosè"
                description="Informativa sulla privacy di Centro Lavaggio Mosè a Lercara Friddi."
            />
            <div className="container mx-auto px-4 max-w-4xl">
                <h1 className="text-4xl font-bold text-slate-900 mb-8 border-b pb-4">Informativa sulla Privacy</h1>

                <div className="prose prose-slate max-w-none space-y-6 text-slate-700">
                    <section>
                        <h2 className="text-2xl font-semibold text-slate-800 mb-4">1. Informazioni Generali</h2>
                        <p>
                            Benvenuto su Centro Lavaggio Mosè. La tua privacy è molto importante per noi. Questa informativa spiega come gestiamo i tuoi dati navigando sul nostro sito web: <code className="bg-slate-100 px-1 rounded">https://centrolavaggiomose.it</code>.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-slate-800 mb-4">2. Cookie e Tracciamento</h2>
                        <p>
                            Il nostro sito web è progettato per rispettare al massimo la tua privacy:
                        </p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li><strong>Nessun Cookie di Profilazione:</strong> Non utilizziamo cookie per scopi pubblicitari o di profilazione.</li>
                            <li><strong>Nessun Tracciamento di Terze Parti:</strong> Non abbiamo installato Google Analytics, Facebook Pixel o altri tracker che monitorano il tuo comportamento online.</li>
                            <li><strong>Archiviazione Tecnica:</strong> Utilizziamo sumente tecnologie strettamente necessarie alla navigazione (LocalStorage) per il corretto funzionamento tecnico del sito.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-slate-800 mb-4">3. Raccolta Dati Personali</h2>
                        <p>
                            Questo sito web non raccoglie dati personali in modo automatico. Gli unici modi in cui potremmo ricevere i tuoi dati sono:
                        </p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Tramite il contatto diretto effettuato dall'utente (telefono, email o WhatsApp), nel qual caso i dati verranno utilizzati esclusivamente per rispondere alla tua richiesta.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-slate-800 mb-4">4. Luogo del Trattamento</h2>
                        <p>
                            Tutti i dati tecnici necessari per il funzionamento del sito sono ospitati su server sicuri gestiti da fornitori affidabili (Vercel e Supabase) che rispettano le normative GDPR.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-slate-800 mb-4">5. I Tuoi Diritti</h2>
                        <p>
                            Ai sensi del GDPR, hai il diritto di accedere, rettificare o richiedere la cancellazione di qualsiasi dato personale che ci hai fornito volontariamente. Puoi contattarci via email all'indirizzo presente nella sezione contatti.
                        </p>
                    </section>

                    <section className="bg-slate-50 p-6 rounded-xl border border-slate-100 mt-12">
                        <p className="text-sm italic">
                            Ultimo aggiornamento: 2 Marzo 2026. Questa informativa può essere aggiornata per riflettere eventuali modifiche tecniche al sito.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
