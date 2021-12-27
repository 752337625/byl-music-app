declare interface BeforeInstallPromptEvent extends Event {
	readonly platforms: string[];
	readonly userChoice: Promise<{
		outcome: 'accepted' | 'dismissed';
		platform: string;
		userChoice: Promise<boolean>;
	}>;
	prompt(): Promise<void>;
}
declare let appPromptEvent: appPromptEvent;
