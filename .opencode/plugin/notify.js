export const Notify = async ({ project, client, $ }) => {
  const { exec } = await import('child_process');
  const { promisify } = await import('util');
  const execAsync = promisify(exec);

  const notify = async (title, body, urgency = 'normal') => {
    try {
      const escapedTitle = title.replace(/"/g, '\\"');
      const escapedBody = body.replace(/"/g, '\\"');
      await execAsync(`notify-send -u ${urgency} "${escapedTitle}" "${escapedBody}"`);
    } catch (e) {
    }
  };

  const messages = [
    "Sohail, your input is needed",
    "Task complete. Awaiting your response",
    "Waiting for input, Sohail",
    "Session idle. Ready for next instruction",
    "Finished. Awaiting your command",
    "Ready for your next task, Sohail",
    "Task complete. Your turn",
    "Awaiting further instructions",
    "Work completed. Standing by",
    "Ready when you are, Sohail"
  ];

  const permissionMessages = [
    "Sohail, permission required",
    "Awaiting your approval",
    "Permission needed to proceed",
    "Approval required, Sohail",
    "Waiting for authorization"
  ];

  return {
    event: async ({ event }) => {
      if (event.type === "session.idle") {
        const msg = messages[Math.floor(Math.random() * messages.length)];
        await notify("OpenCode", msg);
      }
      if (event.type === "permission.updated") {
        const msg = permissionMessages[Math.floor(Math.random() * permissionMessages.length)];
        await notify("OpenCode", msg, "critical");
      }
    }
  };
};
