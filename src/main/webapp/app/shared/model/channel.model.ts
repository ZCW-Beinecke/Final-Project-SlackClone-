import { IWorkspace } from 'app/shared/model/workspace.model';
import { IUserProfile } from 'app/shared/model/user-profile.model';

export interface IChannel {
  id?: number;
  name?: string;
  description?: string | null;
  workspace?: IWorkspace | null;
  members?: IUserProfile[] | null;
}

export const defaultValue: Readonly<IChannel> = {};
