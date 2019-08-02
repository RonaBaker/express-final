import { app } from './app';
import { getConfig } from './utils/config';
import { loadData } from './utils/data-loading';

const port = +(getConfig('PORT', 3006));
app.set('port', port);

app.listen(port, () => {
        // tslint:disable-next-line: no-console
        console.log('App is running at http://localhost:%d in %s mode',
            app.get('port'),
            app.get('env'));
        // tslint:disable-next-line: no-console
        console.log(' Press CTRL-C to stop\n');
});

try {
    loadData(port);
} catch (err) {
    // tslint:disable-next-line: no-console
    console.log(err);
}
