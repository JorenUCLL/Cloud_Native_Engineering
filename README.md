"# Cloud_Native_Engineering"

# Opstarten

Aangezien Azure last minute een 409 error geeft, moet het opstarten van de applicatie lokaal via docker gebeuren op dit moment. Dit wordt natuurlijk nog gefixt komende weken.

1. Run docker lokaal op pc
2. in \Cloud_Native_Engineering, run: docker-compose up --build
3. Front-End draait op http://localhost:8081
4. Back-End draait op http://localhost:3000

# Informatie

Onze applicatie bezorgt een simpele manier om workouts in te plannen voor jezelf, mijlpalen te stellen en te bereiken.
Op de Home-pagina kan je de workouts van vandaag en van komende week zien.

Op de Workout-pagina (Dumbell in de sidebar), zie je een kalender waar je eigen workouts per dag staan. Je kan hier door de weken scrollen.

Door te klikken op het plus-icoontje in de sidebar, kan je een nieuwe workout toevoegen. Hier kan je titel, datum, type en exercises kiezen.

Op de Profiel-pagina (mannetje in de sidebar), zie je je eigen profiel met nogmaals de workouts van die dag + je beste prestaties onderaan en voltooide workouts.
