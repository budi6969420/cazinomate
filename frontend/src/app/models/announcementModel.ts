export class AnnouncementModel
{
  title: string = "";
  description: string = "";
  imageUrl: string   = "";
  buttonText: string | null = "";
  navigationUrl: string = "";
  isSpecial: boolean = false;
  deactivateButton: boolean = false;
}
