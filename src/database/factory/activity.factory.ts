// import { Faker } from '@faker-js/faker';
// import { ActivityLog } from '../../modules/activitylog/entities/activitylog.entity';

// export default  ActivityLogFactory(ActivityLog, (faker: Faker) => {
//     const activityLog = new ActivityLog();
//     activityLog.action = faker.helpers.arrayElement(['LOGIN', 'UPDATE_PROFILE', 'DELETE_POST']);
//     activityLog.userId = faker.datatype.number({ min: 1, max: 100 });
//     activityLog.description = faker.lorem.sentence();
//     activityLog.createdAt = faker.date.recent();
//     return activityLog;
// });