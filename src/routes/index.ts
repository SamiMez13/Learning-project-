// combine all ur routes  of application 

import {Router} from 'express';
import {healthRouter} from './health.routes';

export const apiRouter= Router(); 
apiRouter.use(healthRouter);