module.exports = {
    "*/1 * * * *": async () => {
  
      try {
        const now = new Date().toISOString();
        const overdueTasks = await strapi.entityService.findMany("api::task.task", {
          filters: {
            endDate: { $lt: now },
            completed: false,
          },
        });

        for (const task of overdueTasks) {
            const user = await strapi.entityService.findOne("plugin::users-permissions.user", task.userId);
            
            await strapi.plugins["email"].services.email.send({
              to: user.email,
              subject: "Overdue Task Reminder",
              html: `<p>Hello ${user.username},</p>
                     <p>Your task <strong>${task.title}</strong> was due on ${task.endDate}.</p>
                     <p>Please complete it as soon as possible.</p>`,
            });
  
            strapi.log.info(`📧 Sent email to ${user.email}`);
        }
      } catch (error) {
        strapi.log.error(error);
      }
    },
  };
  